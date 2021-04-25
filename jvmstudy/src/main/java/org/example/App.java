package org.example;

/**
 * Hello world!
 *
 */
public class App {
    public static void main( String[] args ) {
        ClassLoader classLoader = App.class.getClassLoader();
        System.out.println(classLoader);                            // AppClassLoader
        System.out.println(classLoader.getParent());                // PlatformClassLoader
        System.out.println(classLoader.getParent().getParent());    // BootstrapClassLoader => Native 라 자바로는 참조 불가능.
    }
}
