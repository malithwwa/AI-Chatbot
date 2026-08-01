import { prisma } from "..";
import type { Product } from "../generated/prisma/client";

export const productRepository = {
   getProductById: async (productId: number): Promise<Product | null> => {
      return await prisma.product.findUnique({
         where: { id: productId },
      });
   }
};