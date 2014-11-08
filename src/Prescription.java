import java.util.ArrayList;
import java.util.List;

/** A prescription from doctor.
 * 
 * @author Jim Ren
 *
 */

public class Prescription {
	private String name;
	private List<Food> foodList;
	private Data data;
	private int numRepetition;
	
	public Prescription(String n) {
		setName(n);
		setFoodList(new ArrayList<Food>());
		setData(null);
		setNumRepetition(0);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Food> getFoodList() {
		return foodList;
	}
	
	public void setFoodList(List<Food> foodList) {
		this.foodList = foodList;
	}

	public Data getData() {
		return data;
	}

	public void setData(Data data) {
		this.data = data;
	}

	public int getNumRepetition() {
		return numRepetition;
	}

	public void setNumRepetition(int numRepetition) {
		this.numRepetition = numRepetition;
	}
	
	
}
