import { getUserOrders } from "../../utils/orderStorage";

const ProfileOrders = () => {
  const orders = getUserOrders();

  return (
    <>
      <h1 className="mb-6">My Orders</h1>

      <div className="card">
        {orders.length ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 text-sm" >
                <p className="text-textMuted mb-2">
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-2 border-b" >
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-textMuted">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ₹ {item.product.price * item.quantity}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between mt-3 font-semibold">
                  <span>Total</span>
                  <span>₹ {order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-textMuted">No orders placed yet</p>
        )}
      </div>
    </>
  );
};

export default ProfileOrders;
