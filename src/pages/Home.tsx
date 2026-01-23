const Home = () => {
  return (
    <div className="p-6 space-y-8">
      <h1>Autumn Collection</h1>

      <div className="card space-y-3">
        <span className="badge">New Arrival</span>

        <p className="text-textMuted">
          Premium handcrafted products inspired by autumn tones.
        </p>

        <p className="price text-xl">₹2,499</p>

        <button className="btn-primary">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
