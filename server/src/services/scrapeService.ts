import axios from "axios";
import cheerio from "cheerio";
import pool from "../utils/db";

function decodeEmail(encoded: string): string {
  let r = parseInt(encoded.substring(0, 2), 16);
  return encoded.substring(2).replace(/../g, function (e) {
    return String.fromCharCode(parseInt(e, 16) ^ r);
  });
}

export const scrapeEmails = async (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return { error: true, message: "invalid url address" };
  }
  try {
    const res = await axios.get(url);

    const $ = cheerio.load(res.data);

    // Extract obfuscated email addresses
    const obfuscatedEmailPattern = /data-cfemail="([a-f0-9]+)"/g;

    const obfuscatedEmails: string[] = [];
    let match;

    while ((match = obfuscatedEmailPattern.exec(res.data)) !== null) {
      const encodedEmail = match[1];
      const decodedEmail = decodeEmail(encodedEmail);
      obfuscatedEmails.push(decodedEmail);
    }

    // Extract email addresses from the page text
    const pageText = $("body").text();
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const pageEmails = pageText.match(emailPattern) || [];

    const allEmails = [...new Set([...obfuscatedEmails, ...pageEmails])];

    for (const email of allEmails) {
      await pool.query(
        "INSERT INTO emails (email, link) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [email, url]
      );
    }

    // const links: string[] = [];
    // $("a[href]").each((_, element) => {
    //   const link = $(element).attr("href");
    //   if (link && link.startsWith("http")) {
    //     links.push(link);
    //   }
    // });

    // for (const link of links) {
    //   try {
    //     await scrapeEmails(link);
    //   } catch (error: any) {
    //     console.error(`Error scraping linked page ${link}: ${error.message}`);
    //   }
    // }

    return {
      emails: allEmails.map((email) => ({ email, link: url })),
      message: "Emails Scrapped Successfully",
    };
  } catch (error: any) {
    return { error: true, message: "Error Scrapping Emails" };
  }
};
