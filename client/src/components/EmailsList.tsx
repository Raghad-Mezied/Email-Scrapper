import { Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import { EmailsListProps } from "../interface";
import { EmailsListSkeleton } from "./EmailsListSkeleton";

export const EmailsList = ({ emails, loading, result }: EmailsListProps) => {
  return (
    <div className=" p-[20px] m-auto flex flex-col gap-[20px] max-h-[80vh] h-[60vh] w-[calc(60%-130px)]">
      {result.length !== 0 && (
        <>
          <Typography
            variant="h6"
            gutterBottom
            className="text-[rgb(85,45,33)]"
          >
            result ({result.length})
          </Typography>

          <List
            className="w-full overflow-y-auto max-h-[20vh]"
            disablePadding={true}
            dense={true}
          >
            {result.length ? (
              result.map(({ email, link }: any) => (
                <>
                  <ListItem
                    key={email}
                    className="w-full bg-[rgba(253,251,241,1)] flex justify-between"
                    alignItems="flex-start"
                  >
                    <ListItemText primary={email} />
                    <Link rel="noopener" target="_blank" href={link}>
                      Website Url
                    </Link>
                  </ListItem>
                </>
              ))
            ) : (
              <ListItem className="w-full bg-[rgba(253,251,241,1)] flex justify-between">
                <ListItemText primary={"No scrapped emails"} />
              </ListItem>
            )}
          </List>
        </>
      )}

      <Typography variant="h6" gutterBottom className="text-[rgb(85,45,33)]">
        All scrapped emails {!loading && `(${!loading && emails.length})`}
      </Typography>

      <List
        className="w-full h-full overflow-y-auto flex-1"
        disablePadding={true}
        dense={true}
      >
        {loading ? (
          <EmailsListSkeleton />
        ) : emails.length ? (
          emails.map(({ email, link }: any) => (
            <ListItem
              key={email}
              className="w-full bg-[rgba(253,251,241,1)] flex justify-between"
              alignItems="flex-start"
            >
              <ListItemText primary={email} />
              <Link rel="noopener" target="_blank" href={link}>
                Website Url
              </Link>
            </ListItem>
          ))
        ) : (
          <ListItem className="w-full bg-[rgba(253,251,241,1)] flex justify-between">
            <ListItemText primary={"No scrapped emails"} />
          </ListItem>
        )}
      </List>
    </div>
  );
};
