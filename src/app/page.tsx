'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { products } from "./mockData"
import { Input } from "@/components/ui/input"
import Rating from "@/components/ui/rating"
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
// import { Rating } from "@/components/ui/rating"

const productTypes = ["All", "Shoes", "Headphones", "Laptop", "Television", "Drone", "Console"]

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [visibleCount, setVisibleCount] = useState(6)
  const loadMoreRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [version, setVersion] = useState('A')
  const [showRating, setShowRating] = useState(false)
  const [freeShip, setFreeShip] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true)
        setTimeout(() => {
          setVisibleCount((prev) => prev + 6)
          setLoading(false)
        }, 1000) // Simulate loading delay
      }
    }, { threshold: 1 })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const savedVersion = localStorage.getItem('abTestVersion');
    const availableVersions = JSON.parse(localStorage.getItem('versions') || '["A", "B"]');

    if (savedVersion && availableVersions.includes(savedVersion)) {
      setVersion(savedVersion);
    } else {
      setVersion('A'); // Hoặc một phiên bản mặc định khác
    }
  }, []);

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = version === 'A' ? '/version-a' : '/version-b';
    }
  }, [version]);

  useEffect(() => {
    const savedShowRating = localStorage.getItem('showRating') === 'true';
    const savedFreeShip = localStorage.getItem('freeShip') === 'true';
    setShowRating(savedShowRating);
    setFreeShip(savedFreeShip);
  }, []);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      setIsAlertOpen(true); // ✅ chỉ bật lên nếu chưa từng xem
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    (filterType === "All" || filterType === "" || product.type === filterType) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 pl-10 border border-gray-300 rounded"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="mb-4">
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 hover:bg-gray-300"
          >
            {type}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-gray-800"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {product.description}
              </p>
              {freeShip && <span className="text-sm text-green-500">Free Shipping</span>}
              {showRating && <Rating defaultSelected={4} />}
              <div className="flex justify-between items-center">
                {version === 'B' && product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-red-500 line-through mr-2">${product.price.toFixed(2)}</span>
                    <span className="text-xl font-bold text-primary">${product.salePrice.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-red-500">SALE OFF</span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                )}

                <Link href={`/product/${product.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <Spinner />}
      <div ref={loadMoreRef} className="h-10"></div>
      <Dialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">Hi there</h2>
          <p className="mb-4">
            This version was built with limited time during the weekend, so it’s a simplified version with limited backend. Thank you for reviewing it!
          </p>
          <Button
            onClick={() => {
              localStorage.setItem("hasSeenWelcomePopup", "true");
              setIsAlertOpen(false);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Sure
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
