package mainproject.stocksite.domain.comment.mapper;


import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.comment.dto.CommentPatchDto;
import mainproject.stocksite.domain.comment.dto.CommentPostDto;
import mainproject.stocksite.domain.comment.dto.CommentResponseDto;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    default Comment commentPostDtoToComment(CommentPostDto commentPostDto, Long memberId) {
        Comment comment = new Comment();
        comment.setContent(commentPostDto.getContent());
        Member member = new Member();
        member.setMemberId(memberId);
        comment.setMember(member);

        return comment;
    }

    default Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto){
        Comment comment = new Comment();
        comment.setCommentId(commentPatchDto.getCommentId());
        comment.setContent(commentPatchDto.getContent());
        return comment;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.username", target = "username")
    CommentResponseDto commentToResponseDto(Comment comment);

}
