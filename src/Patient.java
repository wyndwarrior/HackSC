import java.util.ArrayList;
import java.util.List;

/** A class storing the info of a patient.
 * 
 * @author Jim Ren
 *
 */

public class Patient {
	private String name;
	private int id;
	private List<Prescription> listPrescription;
	
	public Patient() {
		this("wydn07", 0);
	}
	
	public Patient(String n, int i) {
		setName(n);
		setId(i);
		setListPrescription(new ArrayList<Prescription>());
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<Prescription> getListPrescription() {
		return listPrescription;
	}

	public void setListPrescription(List<Prescription> listPrescription) {
		this.listPrescription = listPrescription;
	}
}
