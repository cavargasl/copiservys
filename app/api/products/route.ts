//import { env } from "@/config/env.mjs";
import { productService } from "@/core/products/application/productService";
//import { excelProductsRepository } from "@/core/products/infrastructure/excelProducts.repository";
import { JsonProductsRepository } from "@/core/products/infrastructure/jsonProducts.repository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await productService(JsonProductsRepository()).getProducts();
    //const products = await productService(excelProductsRepository(env.NEXT_PUBLIC_PRODUCTS_SHEET_URL)).getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo productos del json", error);
    return NextResponse.json({ error: "Error obteniendo productos del json" }, { status: 500 });
  }
}
