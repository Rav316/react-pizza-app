import Skeleton from "react-loading-skeleton";

export const CategoriesSkeleton = () => {
  return (
    <div className="categories">
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <Skeleton width={80} height={20} borderRadius={30} />
          </li>
        ))}
      </ul>
    </div>
  );
};
