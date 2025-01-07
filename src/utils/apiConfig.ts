export const endpointMap: Record<string, Record<string, boolean>> = {
    GET: {
      "pet-types": false,
      "categories": false,
      "products": false,
      "products/filter": false,
      "adoption": false,
      "adoption-request": true,
    },
    POST: {
      "signup": false,
      "signin": false,
      "pet-types": true, 
      "categories": true,
      "products": true,
      "adoption": true,
      "adoption/create": true,
      "adoption-request": true,
      "adoption-request/reject": true,
      "adoption-request/approve": true,
    },
    DELETE: {
      "pet-types": true,
      "categories": true,
      "products": true,
    },
  };
  