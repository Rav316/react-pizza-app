import Skeleton from "react-loading-skeleton";

export const PizzaSkeleton = () => {
  return (
    <div className={"pizza-block"}>
      <div className={"pizza-block__title"}>
        <Skeleton width={260} height={260} circle={true} />
      </div>
      <div className={"pizza-block__title"}>
        <Skeleton width={280} height={30} />
      </div>
      <Skeleton width={280} height={70} borderRadius={10} />
      <div className={'pizza-block__bottom'}>
        <Skeleton width={90} height={27} />
        <Skeleton width={152} height={45} borderRadius={20} />
      </div>
    </div>
  );
}