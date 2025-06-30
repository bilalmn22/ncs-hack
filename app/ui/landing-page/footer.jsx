import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-gray-800">
      <div className="">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">Cloutsy</h3>
            <p className="text-gray-400 text-sm">
              Get started now by our service
            </p>
            <div className="flex">
              <Input
                placeholder="Enter your email here"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">
                →
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Account information
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Help and Solution</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Talk to support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Support docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  System status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Covid response
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Update
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Beta test
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing product
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
