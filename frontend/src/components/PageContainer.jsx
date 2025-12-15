// src/components/PageContainer.jsx

// La altura de tu header es h-24 (96px)
// Usamos pt-24 (padding-top: 6rem / 96px) para crear el espacio.

function PageContainer({ children }) {
  return (
    <div className="pt-24 bg-[#161515ff] min-h-screen">
      {children}
    </div>
  );
}

export default PageContainer;
