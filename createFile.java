import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Scanner;

public class CreateMarkdownFile {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in, Charset.forName("GBK"));
        System.out.print("������ҳ�����(Ҳ����Ϊ�ļ���������.md��׺)��");
        String pageTitle = scanner.nextLine();

        System.out.print("������ؼ���, ʹ�ö��ŷָ���");
        String keywords = scanner.nextLine();

        System.out.print("��������漰����ͼƬURL��");
        String imageUrl = scanner.nextLine();

        System.out.print("���������±�ǩ, ʹ�ÿո�ָ���");
        String tagsInput = scanner.nextLine();
        String[] tagsArray = tagsInput.split("\\s+");

        System.out.print("������ҳ��������");
        String description = scanner.nextLine();

        System.out.print("������ҳ����ࣺ");
        String categories = scanner.nextLine();

        // ��ȡ��ǰ������Ϊ�����͸�������
        LocalDate currentDate = LocalDate.now();
        String createDate = currentDate.toString();
        String updatedDate = createDate; // ���贴���͸���������ͬ

        // ����Markdown����
        StringBuilder contentBuilder = new StringBuilder();
        contentBuilder.append("---\n")
                .append("title: ").append(pageTitle).append("\n")
                .append("keywords: '").append(keywords).append("'\n")
                .append("cover: '").append(imageUrl).append("'\n")
                .append("top_single: url('").append(imageUrl).append("')\n")
                .append("top_single_background: '").append(imageUrl).append("'\n");

        if (tagsArray.length > 0) {
            contentBuilder.append("tags:\n");
            for (String tag : tagsArray) {
                contentBuilder.append("  - ").append(tag).append("\n");
            }
        }

        contentBuilder.append("description: ").append(description).append("\n")
                .append("swiper_index: \n")
                .append("sticky: \n")
                .append("categories: ").append(categories).append("\n")
                .append("date: ").append(createDate).append("\n")
                .append("updated: ").append(updatedDate).append("\n")
                .append("---\n");

        // �����ļ���д������
        try {
            File file = new File(pageTitle.replace(" ", "-") + ".md");
            try (BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(new FileOutputStream(file), StandardCharsets.UTF_8))) {
                writer.write(contentBuilder.toString());
                System.out.println("�ļ��Ѵ���: " + file.getAbsolutePath());
            }
        } catch (IOException e) {
            System.err.println("�����ļ�ʱ��������: " + e.getMessage());
        }
    }
}