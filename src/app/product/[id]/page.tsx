'use client'

import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { useCartStore } from "@/store/cart"
import Image from "next/image"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { products } from "../../mockData"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [searchType, setSearchType] = useState("");
  const filteredProducts = products.filter((product) =>
    product.type.toLowerCase().includes(searchType.toLowerCase())
  );

  const product = products.find((p) => p.id === parseInt(params.id))
  const addItem = useCartStore((state) => state.addItem)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {product.gallery && product.gallery[selectedImage] && (
              <Image
                src={product.gallery[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.gallery && product.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-primary mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {product.description}
          </p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {product.features && product.features.map((feature, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
} 