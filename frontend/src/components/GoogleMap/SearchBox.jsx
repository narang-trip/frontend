import { useCallback, useRef, useEffect, useState } from "react";

const SearchBox = ({ map, onPlaceSelected }) => {
  const input = useRef(null);
  const searchBox = useRef(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // 검색 상자에서 장소가 변경될 때 호출되는 함수
  // 선택된 장소의 좌표를 추출, 상태를 업데이트, onPlaceSelected 콜백을 호출
  const handleOnPlacesChanged = useCallback(() => {
    const places = searchBox.current.getPlaces();

    if (places.length > 0) {
      const selectedPlace = places[0];
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();
      const placeId = selectedPlace.place_id;

      setSelectedPlaces((prevPlaces) => [...prevPlaces, { lat, lng, placeId }]);
      onPlaceSelected({ lat, lng, placeId });
    }
    if (input.current) {
      input.current.value = "";
    }
  }, [onPlaceSelected]);

  useEffect(() => {
    if (map) {
      searchBox.current = new window.google.maps.places.SearchBox(
        input.current
      );
      searchBox.current.addListener("places_changed", handleOnPlacesChanged);
    }

    return () => {
      if (map) {
        searchBox.current = null;
        window.google.maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [map, handleOnPlacesChanged]);

  return <input ref={input} placeholder="장소를 검색해주세요" type="text" />;
};

export default SearchBox;
