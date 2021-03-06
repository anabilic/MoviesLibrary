package mk.finki.ukim.mk.Model.pagination;

import lombok.AllArgsConstructor;
import lombok.Data;
import mk.finki.ukim.mk.Model.exceptions.InvalidPageException;

import java.util.List;

@Data
@AllArgsConstructor
public class Page<T> {

    int page;
    int totalPages;
    int pageSize;
    List<T> content;

    public static  <T> Page<T> slice(List<T>content,int page,int pageSize){
        int pageStart=0,pageEnd=0;
        pageStart=page*pageSize;
        pageEnd=(page+1)*pageSize;

        if(pageStart<0 || pageEnd<0 || pageStart>content.size()){
            throw new InvalidPageException();
        }

        if(pageEnd>content.size()){
            pageEnd=content.size();
        }

        return new Page<T>(page,(int)Math.ceil(1.0*content.size()/pageSize),pageSize,content.subList(pageStart,pageEnd));
    }
}