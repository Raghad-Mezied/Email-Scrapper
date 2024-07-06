import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { ScrapeForm, EmailsList } from "./components";
import { Email } from "./interface";

function App() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Email[]>([]);

  const getEmails = async () => {
    setLoading(true);

    const res = await axios.get("/emails");
    setEmails(res.data);

    setLoading(false);
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <div className="bg-[rgba(253,251,241,1)] w-screen h-screen flex justify-center items-center p-[40px] gap-[50px]">
      <div className="w-[calc(40%-130px)] flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[20px] items-center justify-center">
          <Typography
            variant="h2"
            gutterBottom
            className="text-[rgb(19,109,88)] font-bold text-center"
          >
            Email Scrapper
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            className="text-gray-500  leading-[30px] text-center"
          >
            You can add multiple urls to scrape emails from. <br />
            You can check all scrapped emails
          </Typography>
        </div>
        <ScrapeForm getEmails={getEmails} setResult={setResult} />
      </div>
      <EmailsList result={result} emails={emails} loading={loading} />
    </div>
  );
}

export default App;
