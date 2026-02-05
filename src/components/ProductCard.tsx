import { Link } from "react-router-dom";
import type { Product } from "../types/product.types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="card group flex flex-col h-full">
      <img src={product.image} alt={product.title} className="h-44 mx-auto object-contain transition-transform group-hover:scale-105"/>

      <h3 className="mt-4 text-sm font-semibold line-clamp-2">
        {product.title}
      </h3>

      <p className="price mt-2">₹ {product.price}</p>

      <Link to={`/product/${product.id}`} className="btn-primary mt-auto block text-center" >
        View Details
      </Link>
    </div>
  );
};


export default ProductCard;
