import { LocationPin } from './location-pin.dto';
import { TrendingLocationDto } from './trending-location.dto';

export interface HomepageDto {
  map: {
    center: number[];
    zoom: number;
  };
  locationPins: LocationPin[];
  trendingLocations: TrendingLocationDto[];
}
