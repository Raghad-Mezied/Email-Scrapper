import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Email } from "../interface";

export const ScrapeForm = ({
  getEmails,
  setResult,
}: {
  setResult: Dispatch<SetStateAction<Email[]>>;
  getEmails: () => void;
}) => {
  const [url, setUrl] = useState("");
  const [scrappingLoading, setScrappingLoading] = useState(false);
  const [error, setError] = useState("");

  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    try {
      setScrappingLoading(true);

      const response = await axios.post("/scrape", {
        url,
      });

      if (response.data.error) setError(response.data.message);
      else setResult(response.data.emails);
    } catch (error) {
      setError("Something Went Wrong");
    } finally {
      setScrappingLoading(false);
      getEmails();
      setUrl("");
    }
  };

  return (
    <div className="flex flex-col gap-[5px] w-[80%] m-auto">
      <div className="flex justify-between gap-[10px] ">
        <TextField
          className="flex-grow"
          onChange={handleType}
          id="outlined-multiline-flexible"
          placeholder="Enter URL to scrape"
          value={url}
          error={!!error}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "rgb(19, 109, 88)",
              },
            },
          }}
        />
        <Button
          variant="contained"
          disabled={!url || scrappingLoading}
          onClick={handleScrape}
          className="text-white text-sm disabled:text-white disabled:bg-slate-400"
          style={{
            backgroundColor: url && !scrappingLoading ? "rgb(19, 109, 88)" : "",
          }}
        >
          {scrappingLoading ? "loading..." : "Scrape"}
        </Button>
      </div>
      <span className=" text-red-500 text-sm">{error}</span>
    </div>
  );
};
