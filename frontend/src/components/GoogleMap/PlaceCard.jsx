import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";

const PlaceCard = () => {
  const searchResults = useSelector((state) => state.places);
  console.log(searchResults);

  return (
    <Droppable droppableId="PlaceCard">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="w-56">
          {searchResults.map((place, index) => (
            <Draggable draggableId={`draggable_${index}`} index={index} key={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="flex overflow-hidden bg-white rounded-lg">
                    <div className="flex-col">
                    <img className="h-20 w-60" src={place.photo} />
                      <div className="text-xs font-semibold">{place.name}</div>
                      <div className="text-xs">{place.businessStatus}</div>
                      <div className="text-xs">{place.formattedAddress}</div>
                      <div className="text-xs">{place.rating}</div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PlaceCard;
