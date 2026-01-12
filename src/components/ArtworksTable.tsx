import { useEffect, useRef, useState } from 'react';
import { DataTable, type DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import type { Artwork } from '../types';
import { fetchArtworks } from '../api';

const ROWS_PER_PAGE = 12;

export default function ArtworksTable() {
  const [data, setData] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // 🔑 Selection State (SAFE)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());
  const [globalSelectCount, setGlobalSelectCount] = useState<number | null>(null);

  const [selectCount, setSelectCount] = useState('');
  const overlayRef = useRef<OverlayPanel>(null);

  useEffect(() => {
    loadPage(page);
  }, [page]);

  const loadPage = async (pageNum: number) => {
    const res = await fetchArtworks(pageNum, ROWS_PER_PAGE);
    setData(res.data);
    setTotalRecords(res.pagination.total);
  };

  /** Determine selection state without fetching other pages */
  const isRowSelected = (row: Artwork, index: number) => {
    if (deselectedIds.has(row.id)) return false;
    if (selectedIds.has(row.id)) return true;

    if (globalSelectCount !== null) {
      const absoluteIndex =
        (page - 1) * ROWS_PER_PAGE + index + 1;
      return absoluteIndex <= globalSelectCount;
    }
    return false;
  };

  const visibleSelection = data.filter((row, i) =>
    isRowSelected(row, i)
  );

  const onSelectionChange = (rows: Artwork[]) => {
    const visibleIds = new Set(data.map(r => r.id));
    const newSelectedIds = new Set(selectedIds);
    const newDeselectedIds = new Set(deselectedIds);

    visibleIds.forEach(id => {
      if (rows.find(r => r.id === id)) {
        newSelectedIds.add(id);
        newDeselectedIds.delete(id);
      } else {
        if (selectedIds.has(id) || globalSelectCount !== null) {
          newDeselectedIds.add(id);
        }
      }
    });

    setSelectedIds(newSelectedIds);
    setDeselectedIds(newDeselectedIds);
  };

  const handleCustomSelect = () => {
    const count = parseInt(selectCount);
    if (!count || count <= 0) return;
    setGlobalSelectCount(count);
    setSelectedIds(new Set());
    setDeselectedIds(new Set());
    overlayRef.current?.hide();
    setSelectCount('');
  };

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <Button
          label="Custom Select"
          icon="pi pi-check-square"
          onClick={(e) => overlayRef.current?.toggle(e)}
        />
      </div>

      <OverlayPanel ref={overlayRef}>
        <div style={{ display: 'flex', gap: 8 }}>
          <InputText
            placeholder="Select N rows"
            value={selectCount}
            onChange={(e) => setSelectCount(e.target.value)}
          />
          <Button label="Apply" onClick={handleCustomSelect} />
        </div>
      </OverlayPanel>

      <DataTable
        value={data}
        dataKey="id"
        paginator
        rows={ROWS_PER_PAGE}
        totalRecords={totalRecords}
        lazy
        first={(page - 1) * ROWS_PER_PAGE}
        onPage={(e: DataTablePageEvent) =>
          setPage((e.page ?? 0) + 1)
        }
        selection={visibleSelection}
        onSelectionChange={(e) =>
          onSelectionChange(e.value as Artwork[])
        }
        selectionMode="checkbox"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="title" header="TITLE" />
        <Column field="place_of_origin" header="PLACE OF ORIGIN" />
        <Column field="artist_display" header="ARTIST" />
        <Column field="inscriptions" header="INSCRIPTIONS" />
        <Column field="date_start" header="START DATE" />
        <Column field="date_end" header="END DATE" />
      </DataTable>
    </>
  );
}
