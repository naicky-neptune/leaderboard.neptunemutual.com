import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { isZeroAddress } from "../../utils/address";
import { getAvatarSvg } from "../../utils/avatar";
import { classNames } from "../../utils/classnames";
import { formatCurrency } from "../../utils/formatter/currency";
import styles from "./styles.module.scss";
import { truncateString } from "../../utils/truncate";
import useWindowSize from "../../hooks/useWindowSize";
import { useRouter } from "next/router";

export function AddressRow({ data, index }) {
  const { width } = useWindowSize();
  const router = useRouter();
  const { rank, address, name, totalPoints } = data;

  function renderTruncatedLength() {
    if (width <= 1200) {
      // will truncate only for mobile and tablet
      return 8;
    }

    return 50;
  }

  function renderTruncatedPosition() {
    if (width <= 600) {
      return true;
    }

    return false;
  }

  function handleOnClickRow(e) {
    if (width <= 600 && !isZeroAddress(address)) {
      // will execute on mobile view only
      return router.push(`/${address}`);
    }

    return e.preventDefault(); // else prevent execution
  }

  return (
    <tr
      className={classNames(styles.row, styles.fade_in)}
      onClick={handleOnClickRow}
    >
      <td className={styles.rank_cell}>
        <div className={styles.rank_content}>
          <span className={classNames(rank === 1 && styles.first)}>{rank}</span>
          {rank === 1 && (
            <img src="/images/ranks/rank1.svg" alt="" width={"39px"} />
          )}
          {rank === 2 && (
            <img src="/images/ranks/rank2.svg" alt="" width={"31px"} />
          )}
          {rank === 3 && (
            <img src="/images/ranks/rank3.svg" alt="" width={"31px"} />
          )}
        </div>
      </td>

      <td className={styles.image_cell}>
        <div dangerouslySetInnerHTML={{ __html: getAvatarSvg(address) }}></div>
      </td>

      <td
        className={classNames(styles.name_cell, styles[`name_cell_${index}`])}
      >
        <div className={styles.name_cell_content}>
          <h3 className={""}>{name}</h3>
          {width <= 600 && ( // display this on mobile view
            <span className={styles.truncated_string_mobile}>
              {truncateString(
                address,
                renderTruncatedLength(),
                renderTruncatedPosition()
              )}
            </span>
          )}
        </div>
      </td>

      {width > 600 && ( // hide this on mobile view
        <td className={styles.address_cell}>
          {truncateString(
            address,
            renderTruncatedLength(),
            renderTruncatedPosition()
          )}
        </td>
      )}

      <td
        className={classNames(
          styles.points_cell,
          styles[`points_cell_${index}`]
        )}
      >
        <div>{formatCurrency(totalPoints, "", true).short}</div>
      </td>

      {width > 600 && ( // hide this on mobile view
        <td className={styles.action_cell}>
          {!isZeroAddress(address) && (
            <Link href={`/${address}`}>
              <a className={styles.link}>
                <ArrowRightIcon height={18} />
              </a>
            </Link>
          )}
        </td>
      )}
    </tr>
  );
}
