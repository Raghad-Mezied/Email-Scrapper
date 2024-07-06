import { ListItem, ListItemText, Skeleton } from "@mui/material";

export const EmailsListSkeleton = () => {
  return (
    <>
      {Array.from(new Array(10)).map((_, index) => (
        <ListItem
          key={index}
          className="w-full bg-[rgba(253,251,241,1)] flex justify-between"
          alignItems="flex-start"
        >
          <ListItemText primary={<Skeleton width="80%" height={50} />} />
          <Skeleton variant="text" width={100} height={50} />
        </ListItem>
      ))}
    </>
  );
};
