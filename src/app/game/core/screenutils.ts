﻿export class ScreenMetrics {
    windowWidth: number;
    windowHeight: number;

    defaultGameWidth: number;
    defaultGameHeight: number;
    maxGameWidth: number;
    maxGameHeight: number;

    gameWidth: number;
    gameHeight: number;
    scaleX: number;
    scaleY: number;
    offsetX: number;
    offsetY: number;
}

export enum Orientation {PORTRAIT, LANDSCAPE }

export class ScreenUtils {
    public static screenMetrics: ScreenMetrics;

    // -------------------------------------------------------------------------
    public static calculateScreenMetrics(aDefaultWidth: number, aDefaultHeight: number,
        aOrientation: Orientation = Orientation.LANDSCAPE,
        aMaxGameWidth?: number, aMaxGameHeight?: number): ScreenMetrics {

        // get dimension of window
        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;


        // swap if window dimensions do not match orientation
        if ((windowWidth < windowHeight && aOrientation === Orientation.LANDSCAPE) ||
            (windowHeight < windowWidth && aOrientation === Orientation.PORTRAIT)) {
            const tmp: number = windowWidth;
            windowWidth = windowHeight;
            windowHeight = tmp;
        }


        // calculate max game dimension. The bounds are iPad and iPhone
        if (typeof aMaxGameWidth === 'undefined' || typeof aMaxGameHeight === 'undefined') {
            if (aOrientation === Orientation.LANDSCAPE) {
                aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
                aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
            } else {
                aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
                aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
            }
        }


        // default aspect and current window aspect
        const defaultAspect: number = (aOrientation === Orientation.LANDSCAPE) ? 1280 / 800 : 800 / 1280;
        const windowAspect: number = windowWidth / windowHeight;

        let offsetX: number = 0;
        let offsetY: number = 0;
        let gameWidth: number = 0;
        let gameHeight: number = 0;

        // if (aOrientation === Orientation.LANDSCAPE) {
            // 'iPhone' landscape ... and 'iPad' portrait
            if (windowAspect > defaultAspect) {
                gameHeight = aDefaultHeight;
                gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
                gameWidth = Math.min(gameWidth, aMaxGameWidth);
                offsetX = (gameWidth - aDefaultWidth) / 2;
                offsetY = 0;
            } else {    // 'iPad' landscpae ... and 'iPhone' portrait
                gameWidth = aDefaultWidth;
                gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
                gameHeight = Math.min(gameHeight, aMaxGameHeight);
                offsetX = 0;
                offsetY = (gameHeight - aDefaultHeight) / 2;
            }
        /* } else {    // 'iPhone' portrait
            if (windowAspect < defaultAspect) {
                gameWidth = aDefaultWidth;
                gameHeight = gameWidth / windowAspect;
                gameHeight = Math.min(gameHeight, aMaxGameHeight);
                offsetX = 0;
                offsetY = (gameHeight - aDefaultHeight) / 2;
            } else {    // 'iPad' portrait
                gameHeight = aDefaultHeight;
                gameWidth = gameHeight = windowAspect;
                gameWidth = Math.min(gameWidth, aMaxGameWidth);
                offsetX = (gameWidth - aDefaultWidth) / 2;
                offsetY = 0;
            }
        }
        */


        // calculate scale
        const scaleX: number = windowWidth / gameWidth;
        const scaleY: number = windowHeight / gameHeight;


        // store values
        this.screenMetrics = new ScreenMetrics();
        this.screenMetrics.windowWidth = windowWidth;
        this.screenMetrics.windowHeight = windowHeight;

        this.screenMetrics.defaultGameWidth = aDefaultWidth;
        this.screenMetrics.defaultGameHeight = aDefaultHeight;
        this.screenMetrics.maxGameWidth = aMaxGameWidth;
        this.screenMetrics.maxGameHeight = aMaxGameHeight;
        this.screenMetrics.gameWidth = gameWidth;
        this.screenMetrics.gameHeight = gameHeight;
        this.screenMetrics.scaleX = scaleX;
        this.screenMetrics.scaleY = scaleY;
        this.screenMetrics.offsetX = offsetX;
        this.screenMetrics.offsetY = offsetY;

        return this.screenMetrics;
    }
}
