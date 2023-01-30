export interface ProductFormData {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface SupplierFormData {
  id: number;
  name: string;
  city: string;
  products: number[] | any;
}
