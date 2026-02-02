import { useEffect } from "react";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  /* Lock background scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3">
      
      {/* Modal */}
      <div
        className="
          bg-white text-gray-900
          w-full max-w-3xl
          max-h-[85vh]
          rounded-2xl
          shadow-2xl
          relative
          flex flex-col
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            w-9 h-9
            flex items-center justify-center
            rounded-full
            text-gray-600
            hover:bg-gray-100
            text-xl
          "
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-6 space-y-6">
          
          {/* Image */}
          <div className="flex justify-center">
            <div className="w-40 sm:w-52 md:w-60 aspect-square rounded-xl overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            {recipe.title}
          </h2>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-2">Ingredients</h3>
            {recipe.extendedIngredients?.length ? (
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                {recipe.extendedIngredients.map(item => (
                  <li key={item.id}>
                    {item.original.charAt(0).toUpperCase() + item.original.slice(1)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Ingredients not available.
              </p>
            )}
          </div>

          {/* Steps */}
          <div>
            <h3 className="font-semibold mb-2">Steps</h3>
            {recipe.instructions ? (
              <div
                className="
                  text-sm text-gray-700
                  leading-relaxed
                  space-y-2
                  [&_ol]:list-decimal
                  [&_ol]:ml-5
                  [&_li]:mb-1
                "
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <p className="text-sm text-gray-500">
                Step-by-step instructions are not available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
