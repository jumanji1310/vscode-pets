import { ColorThemeKind, PetSize, Theme } from '../common/types';
import { Effect } from './effects/effect';
import { SnowEffect } from './effects/snow';
import { StarEffect } from './effects/stars';

function normalizeColorThemeKind(kind: ColorThemeKind): 'dark' | 'light' {
    switch (kind) {
        case ColorThemeKind.light:
            return 'light';
        case ColorThemeKind.dark:
            return 'dark';
        case ColorThemeKind.highContrast:
            return 'dark';
        case ColorThemeKind.highContrastLight:
            return 'light';
        default:
            return 'light';
    }
}

interface AbstractThemeInfo {
    name: string;
    description: string;
    effect?: Effect;

    floor(size: PetSize): number;
    backgroundImageUrl(
        basePetUri: string,
        themeKind: ColorThemeKind,
        petSize: PetSize,
    ): string;
    foregroundImageUrl(
        basePetUri: string,
        themeKind: ColorThemeKind,
        petSize: PetSize,
    ): string;
}

export class ThemeInfo implements AbstractThemeInfo {
    name: string = '';
    description: string = '';
    effect?: Effect = undefined;

    // eslint-disable-next-line no-unused-vars
    floor(size: PetSize): number {
        return 0;
    }
    backgroundImageUrl(
        basePetUri: string,
        themeKind: ColorThemeKind,
        petSize: PetSize,
    ): string {
        var _themeKind = normalizeColorThemeKind(themeKind);
        return `url('${basePetUri}/backgrounds/${this.name}/background-${_themeKind}-${petSize}.png')`;
    }
    foregroundImageUrl(
        basePetUri: string,
        themeKind: ColorThemeKind,
        petSize: PetSize,
    ): string {
        var _themeKind = normalizeColorThemeKind(themeKind);
        return `url('${basePetUri}/backgrounds/${this.name}/foreground-${_themeKind}-${petSize}.png')`;
    }
}

class IoniaThemeInfo extends ThemeInfo {
    name = 'ionia';
    description = 'A ionia theme';

    floor(size: PetSize): number {
        switch (size) {
            case PetSize.small:
                return 30;
            case PetSize.medium:
                return 40;
            case PetSize.large:
                return 65;
            case PetSize.nano:
            default:
                return 23;
        }
    }
}

class OutdoorThemeInfo extends ThemeInfo {
    name = 'outdoor';
    description = 'A outdoor theme';

    floor(size: PetSize): number {
        switch (size) {
            case PetSize.small:
                return 90;
            case PetSize.medium:
                return 120;
            case PetSize.large:
                return 180;
            case PetSize.nano:
            default:
                return 65;
        }
    }
}

class SerbiaThemeInfo extends ThemeInfo {
    name = 'serbia';
    description = 'A serbia theme';

    floor(size: PetSize): number {
        switch (size) {
            case PetSize.small:
                return 60;
            case PetSize.medium:
                return 80;
            case PetSize.large:
                return 120;
            case PetSize.nano:
            default:
                return 45;
        }
    }
}

class SummonersRiftThemeInfo extends ThemeInfo {
    name = 'summonersRift';
    description = 'A summonersRift theme';

    floor(size: PetSize): number {
        switch (size) {
            case PetSize.small:
                return 20;
            case PetSize.medium:
                return 30;
            case PetSize.large:
                return 45;
            case PetSize.nano:
            default:
                return 18;
        }
    }
}

// Map of theme name to theme info
export const THEMES: Record<Theme, ThemeInfo> = {
    none: {
        name: 'none',
        description: 'No theme',
        /* eslint-disable no-unused-vars */
        floor: (size: PetSize) => 0,
        backgroundImageUrl: (
            basePetUri: string,
            themeKind: ColorThemeKind,
            petSize: PetSize,
        ) => '',
        foregroundImageUrl: (
            basePetUri: string,
            themeKind: ColorThemeKind,
            petSize: PetSize,
        ) => '',
        /* eslint-enable no-unused-vars */
    },
    ionia: new IoniaThemeInfo(),
    outdoor: new OutdoorThemeInfo(),
    serbia: new SerbiaThemeInfo(),
    summonersRift: new SummonersRiftThemeInfo(),
};
