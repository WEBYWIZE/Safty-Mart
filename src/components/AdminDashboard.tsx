import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  Tag,
  Truck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search
} from 'lucide-react';
import { GSTInvoiceModal } from './GSTInvoiceModal.js';
import { Order, Product } from '../types.js';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    products,
    coupons,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    categories
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'products' | 'coupons'>('analytics');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    tagline: '',
    category: 'Home Safety',
    price: 499,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 12,
    images: ['https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80'],
    description: 'High quality home safety product tested for durability.',
    features: ['Non-toxic certified material', 'Easy to install at home'],
    specifications: { 'Material': 'ABS Plastic', 'Warranty': '1 Year' },
    inStock: true,
    stockQuantity: 50,
    hsnCode: '73269099',
    gstPercent: 18,
    isBestSeller: false,
    isNewArrival: true
  });

  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'SUCCESS' || o.orderStatus === 'DELIVERED')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'PLACED' || o.orderStatus === 'ACCEPTED').length;
  const lowStockCount = products.filter(p => p.stockQuantity < 10).length;

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name) {
      addProduct(newProduct);
      setShowAddProductModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center font-black">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <div>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                SAFTY MART Management Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-black">Admin Control Center</h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-2xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'analytics' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              Overview & Analytics
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all relative ${
                activeTab === 'orders' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              Orders ({orders.length})
              {pendingOrdersCount > 0 && (
                <span className="ml-1 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'products' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              Products Catalog ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'coupons' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              Coupons
            </button>
          </div>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-wider">Total Revenue</span>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <p className="text-[10px] text-emerald-600 font-bold">100% PayU Verified & COD Received</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">{orders.length}</div>
                <p className="text-[10px] text-slate-500 font-medium">{pendingOrdersCount} pending supplier dispatch</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-wider">Active Products</span>
                  <Package className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">{products.length}</div>
                <p className="text-[10px] text-slate-500 font-medium">Across {categories.length - 1} Categories</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-wider">Stock Alerts</span>
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">{lowStockCount}</div>
                <p className="text-[10px] text-rose-600 font-bold">Products under 10 stock items</p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Recent Orders Queue</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-200">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">{order.orderNumber}</td>
                        <td className="p-3 font-medium text-slate-800">{order.shippingAddress.fullName}</td>
                        <td className="p-3 font-bold text-slate-700">{order.paymentMethod} ({order.paymentStatus})</td>
                        <td className="p-3 font-black text-amber-600">₹{order.totalAmount}</td>
                        <td className="p-3">
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="bg-slate-900 text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" /> Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">All Customer Orders</h3>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-black text-slate-900">{order.orderNumber}</span>
                      <span className="ml-2 text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-md">
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="bg-slate-900 text-amber-400 font-bold text-[10px] px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" /> Print GST Invoice
                      </button>

                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="text-xs font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1 focus:outline-hidden"
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="PACKING">PACKING</option>
                        <option value="DISPATCHED">DISPATCHED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p><span className="font-bold text-slate-800">Customer:</span> {order.shippingAddress.fullName} ({order.shippingAddress.phone}, {order.shippingAddress.email})</p>
                    <p><span className="font-bold text-slate-800">Address:</span> {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
                    <p><span className="font-bold text-slate-800">PayU Payment ID:</span> {order.payuPaymentId || 'N/A'}</p>
                    {order.trackingNumber && <p><span className="font-bold text-emerald-700">Courier Tracking:</span> {order.courierPartner} - {order.trackingNumber}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Product Inventory Catalog</h3>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Add New Product
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex gap-4 items-center">
                  <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-slate-200" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-black text-slate-900 truncate">{p.name}</h4>
                    <p className="text-[10px] text-amber-600 font-bold">{p.category}</p>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                      <span>₹{p.price}</span>
                      <span className="text-[10px] text-slate-400 font-medium">(Stock: {p.stockQuantity})</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 text-slate-400 hover:text-rose-600"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Active Promotional Coupons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c, i) => (
                <div key={i} className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-amber-900">
                      {c.discountType === 'PERCENT' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal Trigger */}
      {selectedInvoiceOrder && (
        <GSTInvoiceModal order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4">
            <h3 className="text-base font-black text-slate-900">Add New Home Safety Product</h3>
            <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    {categories.filter(c => c !== 'All Categories').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.images[0]}
                  onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
