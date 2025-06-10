import styles from "./reviews.module.sass";
import type { TReview } from "@/types/review";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

type ReviewsProps = {
  reviews: TReview[];
};

export const Reviews = ({ reviews }: ReviewsProps) => {
  const sanitize = (dirty: string) => {
    return purify.sanitize(dirty, {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "br",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "a",
      ],
      ALLOWED_ATTR: ["href", "target", "rel"],
    });
  };
  return (
    <div className={styles.reviewContainer}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className={styles.reviewItem}
          dangerouslySetInnerHTML={{ __html: sanitize(review.text) }}
        />
      ))}
    </div>
  );
};
