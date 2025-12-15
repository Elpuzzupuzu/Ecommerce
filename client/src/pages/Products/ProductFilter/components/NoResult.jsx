import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

const NoResults = ({ message = "No results found", onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center text-gray-600"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-6"
      >
        <SearchX className="w-20 h-20 text-gray-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-semibold mb-3 text-gray-700"
      >
        No products found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-500 max-w-md mb-6"
      >
        {message || "Try adjusting your filters or search terms."}
      </motion.p>

      {onClearFilters && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition"
        >
          Clear filters
        </motion.button>
      )}
    </motion.div>
  );
};

export default NoResults;
