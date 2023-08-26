import { GlobalToken } from "antd";
import { STATUS_BANNER_VARIANT } from "../constants/project-card";
import moment from "moment";

export function inferStatusBannerVariant(schedule: {
    startDate: string | Date;
    endDate: string | Date;
    idoOpenDate: string | Date;
    idoCloseDate: string | Date;
}): STATUS_BANNER_VARIANT {
    const currentTime = moment(new Date());

    const { startDate, endDate, idoOpenDate, idoCloseDate } = schedule;

    // project has closed
    if (moment(endDate).diff(currentTime) < 0 && moment(idoCloseDate).diff(currentTime) < 0)
        return STATUS_BANNER_VARIANT.CLOSED;

    // project has ended the funding phrase
    if (moment(endDate).diff(currentTime) < 0 && moment(idoOpenDate).diff(currentTime) > 0)
        return STATUS_BANNER_VARIANT.FUNDING_CLOSED;

    // project which has not started is considered as upcoming project
    if (moment(startDate).diff(currentTime) > 0) return STATUS_BANNER_VARIANT.UPCOMING;

    // project is in the IDO state (claiming token)
    if (moment(idoOpenDate).diff(currentTime) < 0 && moment(idoCloseDate).diff(currentTime) > 0)
        return STATUS_BANNER_VARIANT.TOKEN_CLAIMING;

    // project is funding
    if (moment(startDate).diff(currentTime) < 0 && moment(endDate).diff(currentTime) > 0)
        return STATUS_BANNER_VARIANT.FUNDING;

    // default case
    return STATUS_BANNER_VARIANT.UNKNOWN;
}

export function prepareVariantStyle(
    variant: STATUS_BANNER_VARIANT,
    themeToken: GlobalToken
): { backgroundColor: string; color: string } {
    switch (variant) {
        case STATUS_BANNER_VARIANT.UPCOMING: {
            return {
                backgroundColor: "#CCE2FF",
                color: themeToken.colorInfo,
            };
        }

        case STATUS_BANNER_VARIANT.FUNDING: {
            return {
                backgroundColor: "#CBFF92",
                color: themeToken.colorSuccess,
            };
        }

        case STATUS_BANNER_VARIANT.TOKEN_CLAIMING: {
            return {
                backgroundColor: "#FFD6B4",
                color: themeToken.colorPrimary,
            };
        }

        case STATUS_BANNER_VARIANT.CLOSED: {
            return {
                backgroundColor: themeToken.colorTextSecondary,
                color: themeToken.colorWhite,
            };
        }

        case STATUS_BANNER_VARIANT.FUNDING_CLOSED: {
            return {
                backgroundColor: "#FFC2B5",
                color: themeToken.colorError,
            };
        }

        default: {
            return {
                backgroundColor: themeToken.colorTextSecondary,
                color: themeToken.colorWhite,
            };
        }
    }
}