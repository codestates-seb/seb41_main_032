package mainproject.stocksite.domain.comment.repository;

import mainproject.stocksite.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByBoard_BoardId(Long boardId);
}
