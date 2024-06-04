import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Scanner;

public class CreateMarkdownFile {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in, Charset.forName("GBK"));
        System.out.print("请输入页面标题(也将作为文件名，不含.md后缀)：");
        String pageTitle = scanner.nextLine();

        System.out.print("请输入关键字, 使用逗号分隔：");
        String keywords = scanner.nextLine();

        System.out.print("请输入封面及顶部图片URL：");
        String imageUrl = scanner.nextLine();

        System.out.print("请输入文章标签, 使用空格分隔：");
        String tagsInput = scanner.nextLine();
        String[] tagsArray = tagsInput.split("\\s+");

        System.out.print("请输入页面描述：");
        String description = scanner.nextLine();

        System.out.print("请输入页面分类：");
        String categories = scanner.nextLine();

        // 获取当前日期作为创建和更新日期
        LocalDate currentDate = LocalDate.now();
        String createDate = currentDate.toString();
        String updatedDate = createDate; // 假设创建和更新日期相同

        // 构建Markdown内容
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

        // 创建文件并写入内容
        try {
            File file = new File(pageTitle.replace(" ", "-") + ".md");
            try (BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(new FileOutputStream(file), StandardCharsets.UTF_8))) {
                writer.write(contentBuilder.toString());
                System.out.println("文件已创建: " + file.getAbsolutePath());
            }
        } catch (IOException e) {
            System.err.println("创建文件时发生错误: " + e.getMessage());
        }
    }
}