'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const [showCheckout, setShowCheckout] = useState(false)

  const handleOrderClick = () => {
    toast({
      title: 'Feature Incomplete',
      description: 'This feature is not yet complete.'
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  if (showCheckout) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <Input placeholder="John Doe" />
          <Input placeholder="Country" />
          <Input placeholder="Street" />
          <Input placeholder="City" />
          <div className="flex gap-4">
            <Input placeholder="State" className="flex-1" />
            <Input placeholder="ZIP" className="flex-1" />
          </div>
          <h2 className="text-xl font-semibold mt-6">Card Information</h2>
          <Input placeholder="1234 1234 1234 1234" />
          <div className="flex gap-4">
            <Input placeholder="MM/YY" className="flex-1" />
            <Input placeholder="CVC" className="flex-1" />
          </div>
          <Button className="w-full mt-6" onClick={handleOrderClick}>Order</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-4"
            >
              <div className="relative w-24 h-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6" onClick={() => setShowCheckout(true)}>Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 