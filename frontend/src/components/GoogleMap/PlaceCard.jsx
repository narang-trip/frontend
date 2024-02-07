import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";

const PlaceCard = () => {
  const searchResults = useSelector((state) => state.places);
  console.log(searchResults);

  return (
    <Droppable droppableId="PlaceCard">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {searchResults.map((place, index) => (
            <Draggable draggableId={`draggable_${index}`} index={index} key={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="flex rounded-lg overflow-hidden bg-white">
                    <img className="w-20 h-20" src={place.photo} />
                    <div className="flex-col">
                      <h4>{place.name}</h4>
                      <p>{place.businessStatus}</p>
                      <p>{place.formattedAddress}</p>
                      <p>{place.rating}</p>
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
