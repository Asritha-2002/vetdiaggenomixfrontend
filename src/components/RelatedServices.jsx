import { NavLink } from "react-router-dom";
import { getRelatedServices } from "../data/getRelatedServices.js";

const RelatedServices = ({ categoryName, currentKey }) => {
  const related = getRelatedServices(categoryName, currentKey, 3);

  if (related.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <h3 className="text-xl lg:text-2xl font-bold mb-4 text-[#b50b0b]">
        Related Tests
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((service) => (
          <NavLink
            key={service.key}
            to={`/services/${service.key}`}
            className="block border rounded-lg p-4 hover:shadow-lg transition bg-white"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h4 className="font-semibold text-sm lg:text-base">
              {service.title}
            </h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;