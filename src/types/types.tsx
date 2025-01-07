export interface Category {
  categoryId: number;
  name: string;
  description: string;
}

export interface PetType {
  id: number;
  name: string;
}

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  petType: PetType;
  stockQuantity: number;
  images: ImageResponse[];
}

export interface ImageResponse {
  imageId: number;
  data: Base64URLString;
}
export interface ProductsResponse {
  products: Product[];
  nextPage?: number;
}

export interface ProductFilters {
  categoryId?: number;
  petType?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  response: { content: T };
  last: boolean;
  number: number;
}
export interface CartItem {
  id: number; // Product ID
  name: string;
  price: number;
  quantity: number;
  stockQuantity: number;
  image: string; // Base64 or URL of the main product image
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loggedIn: boolean;
}

export interface CartState {
  items: CartItem[];
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

export interface AdoptionListing {
  name: string | null;
  listingId: number;
  user: User;
  petType: PetType;
  breed: string;
  age: number | null;
  description: string | null;
  listedDate: string; // ISO 8601 format
  status: "AVAILABLE" | "PENDING" | "ADOPTED"; // Enum for status
  images: ImageResponse[]; // Array of image URLs
}
export interface AdoptionListing {
  petName: string | null;
  listingId: number;
  user: User;
  petType: PetType;
  breed: string;
  age: number | null;
  description: string | null;
  listedDate: string; // ISO 8601 format
  status: "AVAILABLE" | "PENDING" | "ADOPTED"; // Enum for status
  images: ImageResponse[]; // Array of image URLs
  adoptionRequests: AdoptionRequest[];
}
export interface AdoptionFilters {
  petType?: string[];
  minAge?: number;
  maxAge?: number;
}

export interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  email: string;
  profileImage: ImageResponse | null;
  orders: Order[] | [];
  adoptionRequests: AdoptionRequest[] | [];
  adoptionListings: AdoptionListing[]| [];
}

export interface Order {
  orderId: number;
  orderDate: Date;
  status: "PENDING" | "DELIVERED";
  totalAmount: number;
  orderItems: OrderItem[];
}
export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface AdoptionRequest {
  requestId: number;
  user: User;
  requestDate: Date;
  status: "PENDING" | "REJECTED" |"APPROVED";
  adoptionListing: AdoptionListing;
}
