/** A class that stores food information.
 * 
 * @author Jim Ren
 *
 */

public class Food {
	private String name;
	private double calories;
	
	public Food() {
		this("Unknown", 0);
	}
	
	public Food(String n, double cal) {
		name = n;
		calories = cal;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public double getCalories() {
		return calories;
	}
	
	public void setCalories(double calories) {
		this.calories = calories;
	}
}
