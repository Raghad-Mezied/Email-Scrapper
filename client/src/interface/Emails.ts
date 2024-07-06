export interface Email {
  email: string;
  link: string;
}

export interface EmailsListProps {
  emails: Email[];
  result: Email[];
  loading: boolean;
}
