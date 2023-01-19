package mainproject.stocksite.domain.bookmark.repository;

import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findAllByMember_MemberId(Long memberId);

    void deleteAllByMember_MemberId(Long memberId);
}
