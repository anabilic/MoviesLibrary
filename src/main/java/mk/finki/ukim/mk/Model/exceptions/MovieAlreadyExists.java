package mk.finki.ukim.mk.Model.exceptions;

public class MovieAlreadyExists extends Exception {

    public String s;
    public MovieAlreadyExists(String s) {
        super(s);
        this.s=s;
    }
}
