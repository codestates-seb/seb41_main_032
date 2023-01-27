package mainproject.stocksite.domain.board.repository;


import mainproject.stocksite.domain.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository  extends JpaRepository<Board, Long> {

    //getallboard

    Page<Board> findAllByOrderByBoardIdDesc(Pageable pageable);



}
