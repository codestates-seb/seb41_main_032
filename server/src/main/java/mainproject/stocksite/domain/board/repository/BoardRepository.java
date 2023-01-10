package mainproject.stocksite.domain.board.repository;


import mainproject.stocksite.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository  extends JpaRepository<Board, Long> {

}
