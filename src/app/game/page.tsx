import BoardComponent from "./board";

const GameComponent = () => {
  return (
    <>
      <main className="d-flex justify-content-center">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-8 m-5 p-2">
              <h1>Tic Tac Toe</h1>
              <BoardComponent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default GameComponent;
