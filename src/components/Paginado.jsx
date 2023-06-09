// Redux
import { connect } from "react-redux";
import { setCurrentPage } from "../redux/actions/eventsActions";

// Assets
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Paginado = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.name));
    };

    return (
        <div className="flex content-center w-full h-16">
            <div className="flex self-center items-center gap-4 my-4 mx-auto">
                <button
                    name={currentPage - 1}
                    onClick={()=>setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btnPagination"
                >
                    <AiOutlineArrowLeft size="1.4rem" />
                </button>
                {currentPage === totalPages && totalPages > 3 && (
                    <button
                        name={currentPage - 2}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage - 2}
                    </button>
                )}
                {currentPage >= 2 && (
                    <button
                        name={currentPage - 1}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage - 1}
                    </button>
                )}
                <button
                    name={currentPage}
                    onClick={handlePageChange}
                    className="btnPaginationSelected"
                >
                    {currentPage}
                </button>

                {currentPage < totalPages && (
                    <button
                        name={currentPage + 1}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage + 1}
                    </button>
                )}
                {currentPage === 1 && totalPages > 3 && (
                    <button
                        name={currentPage + 2}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage + 2}
                    </button>
                )}
                <button
                    name={currentPage + 1}
                    onClick={()=>setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btnPagination"
                >
                    <AiOutlineArrowRight size="1.4rem" />
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);
