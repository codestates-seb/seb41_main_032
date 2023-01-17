package mainproject.stocksite.domain.bookmark.repository;

import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
