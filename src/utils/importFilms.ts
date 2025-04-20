import * as XLSX from 'xlsx';
import { Film } from '@/hooks/useFilms';

export async function importFilmsFromExcel(filePath: string): Promise<Omit<Film, 'id'>[]> {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer);
  
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  
  const rawData = XLSX.utils.sheet_to_json(worksheet);
  
  return rawData.map((row: any) => ({
    title: row.title || '',
    description: row.description || '',
    year: parseInt(row.year) || new Date().getFullYear(),
    rating: parseFloat(row.rating) || 7.5,
    genres: (row.genres || '').split(',').map((g: string) => g.trim()).filter(Boolean),
    poster: row.poster || '',
    trailer: row.trailer || '',
    cast: (row.cast || '').split(',').map((c: string) => c.trim()).filter(Boolean)
  }));
}
